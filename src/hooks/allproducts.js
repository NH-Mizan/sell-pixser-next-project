import api from '@/utils/api';

export async function getServerSideProps() {
  try {
    const response = await api.get('/slider'); // this goes to NEXT_PUBLIC_API_URL + /products
    return {
      props: {
        slider: response.data || [],
      },
    };
  } catch (error) {
    console.error('Server Fetch Failed:', error.message);
    return {
      props: {
        slider: [],
      },
    };
  }
}
