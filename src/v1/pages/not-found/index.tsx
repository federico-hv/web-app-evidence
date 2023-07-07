import { Head, NotFoundContent } from '../../components';

function NotFoundPage() {
  return (
    <>
      <Head
        title='Page Not Found'
        description="We do not have what you're looking for."
      />
      <NotFoundContent />
    </>
  );
}
NotFoundPage.displayName = 'NotFoundPage';

export default NotFoundPage;
