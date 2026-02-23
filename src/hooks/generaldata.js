import api from '@/utils/api';

export async function getServerSideProps() {
  try {
    const response = await api.get('/app-config'); 
    return {
      props: {
        generalData: response.data || [],
        
        
      },
    };
  } catch (error) {
    console.error('Server Fetch Failed:', error.message);
    return {
      props: {
        generalData: [],
      },
    };
  }
}
