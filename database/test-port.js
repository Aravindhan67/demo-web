import net from 'net';

console.log('Testing connection to MongoDB port 27017...');

const client = new net.Socket();
client.setTimeout(5000);

client.connect(27017, 'ac-b3uz6vt-shard-00-00.jovuaoj.mongodb.net', function() {
	console.log('SUCCESS: Port 27017 is OPEN and reachable!');
	client.destroy();
});

client.on('timeout', function() {
    console.log('ERROR: Connection timed out. Port 27017 is BLOCKED by your network/ISP.');
    client.destroy();
});

client.on('error', function(err) {
    console.error('ERROR:', err.message);
});
