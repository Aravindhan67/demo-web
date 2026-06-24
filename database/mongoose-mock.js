import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class QueryChain {
  constructor(dataPromise) {
    this.dataPromise = dataPromise;
    this.sortRule = null;
    this.limitCount = null;
  }

  sort(rule) {
    this.sortRule = rule;
    return this;
  }

  limit(count) {
    this.limitCount = count;
    return this;
  }

  select(fields) {
    // Basic select simulation (e.g., '-password')
    this.selectFields = fields;
    return this;
  }

  async then(onfulfilled, onrejected) {
    try {
      let data = await this.dataPromise;
      if (!Array.isArray(data)) {
        return onfulfilled ? onfulfilled(data) : data;
      }
      
      // Clone data so operations don't mutate DB in memory
      let result = JSON.parse(JSON.stringify(data));

      if (this.sortRule) {
        const key = Object.keys(this.sortRule)[0];
        const dir = this.sortRule[key];
        result.sort((a, b) => {
          const valA = a[key];
          const valB = b[key];
          if (valA < valB) return dir === -1 ? 1 : -1;
          if (valA > valB) return dir === -1 ? -1 : 1;
          return 0;
        });
      }

      if (this.limitCount !== null) {
        result = result.slice(0, this.limitCount);
      }

      if (this.selectFields && typeof this.selectFields === 'string') {
        const exclude = this.selectFields.startsWith('-');
        const fieldName = exclude ? this.selectFields.slice(1) : this.selectFields;
        result = result.map(item => {
          const newItem = { ...item };
          if (exclude) {
            delete newItem[fieldName];
          } else {
            // Keep only fieldName
            Object.keys(newItem).forEach(k => {
              if (k !== fieldName && k !== '_id') delete newItem[k];
            });
          }
          return newItem;
        });
      }

      return onfulfilled ? onfulfilled(result) : result;
    } catch (err) {
      if (onrejected) return onrejected(err);
      throw err;
    }
  }
}

class MockModel {
  constructor(name, schema) {
    this.name = name;
    this.schema = schema;
    this.filePath = path.join(DATA_DIR, `${name}.json`);
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
    }
  }

  _read() {
    try {
      const content = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(content);
    } catch (e) {
      return [];
    }
  }

  _write(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }

  find(query = {}) {
    const data = this._read();
    const filtered = data.filter(item => {
      return Object.keys(query).every(key => {
        // Basic match simulation
        if (query[key] && typeof query[key] === 'object' && query[key].$gt) {
          return new Date(item[key]) > query[key].$gt;
        }
        return item[key] === query[key];
      });
    });
    return new QueryChain(Promise.resolve(filtered));
  }

  async findOne(query = {}) {
    const data = this._read();
    const item = data.find(item => {
      return Object.keys(query).every(key => item[key] === query[key]);
    });
    if (!item) return null;

    // Simulate mongoose document instance with comparePassword
    const doc = { ...item };
    doc.comparePassword = async function (candidatePassword) {
      return bcrypt.compare(candidatePassword, doc.password);
    };
    doc.save = async () => {
      const dbData = this._read();
      const idx = dbData.findIndex(i => i._id === doc._id);
      if (idx !== -1) {
        dbData[idx] = { ...doc };
        this._write(dbData);
      }
      return doc;
    };
    return doc;
  }

  async findById(id) {
    return this.findOne({ _id: id });
  }

  async create(obj) {
    if (Array.isArray(obj)) {
      const createdDocs = [];
      for (const item of obj) {
        const doc = await this.create(item);
        createdDocs.push(doc);
      }
      return createdDocs;
    }

    const data = this._read();
    
    // Parse schema defaults
    const defaults = {};
    if (this.schema && this.schema.definition) {
      for (const [key, field] of Object.entries(this.schema.definition)) {
        if (field && typeof field === 'object' && field.default !== undefined) {
          defaults[key] = typeof field.default === 'function' ? field.default() : field.default;
        }
      }
    }

    // Simulate mongoose pre-save hook
    const newDoc = {
      _id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...defaults,
      ...obj
    };

    if (this.name === 'User' && newDoc.password && !newDoc.password.startsWith('$2a$')) {
      const salt = await bcrypt.genSalt(10);
      newDoc.password = await bcrypt.hash(newDoc.password, salt);
    }

    data.push(newDoc);
    this._write(data);
    
    newDoc.comparePassword = async function (candidatePassword) {
      return bcrypt.compare(candidatePassword, newDoc.password);
    };
    newDoc.save = async () => {
      const dbData = this._read();
      const idx = dbData.findIndex(i => i._id === newDoc._id);
      if (idx !== -1) {
        dbData[idx] = { ...newDoc };
        this._write(dbData);
      }
      return newDoc;
    };
    return newDoc;
  }

  async findByIdAndUpdate(id, updateData, options = {}) {
    const data = this._read();
    const idx = data.findIndex(item => item._id === id);
    if (idx === -1) return null;

    data[idx] = {
      ...data[idx],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    this._write(data);
    return data[idx];
  }

  async findByIdAndDelete(id) {
    const data = this._read();
    const idx = data.findIndex(item => item._id === id);
    if (idx === -1) return null;

    const removed = data.splice(idx, 1)[0];
    this._write(data);
    return removed;
  }

  async deleteMany(query = {}) {
    this._write([]);
    return { deletedCount: 0 };
  }

  async countDocuments(query = {}) {
    const list = await this.find(query);
    return list.length;
  }
}

class MockSchema {
  constructor(definition, options) {
    this.definition = definition;
    this.options = options;
    this.hooks = {};
  }

  pre(event, callback) {
    this.hooks[event] = callback;
  }

  methods = {};
}

const mongooseMock = {
  Schema: MockSchema,
  model: (name, schema) => {
    return new MockModel(name, schema);
  },
  connect: async () => {
    console.log('Using JSON file-based database engine (SQLite/MongoDB simulation mode).');
    return { connection: { host: 'JSON-DB-Server-Localhost' } };
  }
};

export default mongooseMock;
