import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCmsServices } from '../api/cmsClient';
import ServiceDetailPage from '../components/ServiceDetailPage';
import { buildGenericServiceDetail } from '../data/cmsServiceDetail';
import { mergeCmsServices, type ServiceDefinition } from '../data/services';
import NotFound from './NotFound';

export default function CmsServiceDetail() {
  const { slug = '' } = useParams();
  const [service, setService] = useState<ServiceDefinition>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetchCmsServices()
      .then((records) => {
        setService(mergeCmsServices(records).find((item) => item.path === `/services/${slug}`));
      })
      .catch(() => setService(undefined))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main className="page active" style={{ display: 'block', minHeight: '65vh' }}>
        <section className="section">
          <div className="wrap"><p>Loading service...</p></div>
        </section>
      </main>
    );
  }

  if (!service) return <NotFound />;

  return (
    <ServiceDetailPage
      path={service.path}
      serviceOverride={service}
      detailOverride={buildGenericServiceDetail(service)}
    />
  );
}
