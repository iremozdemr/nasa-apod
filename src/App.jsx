import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

function App() {
  //state'leri tanımlama
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //api'den veri çekme işlemi
  const fetchData = async () => {
    try{
      const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');

      if(response.ok == false) {
        throw new Error('veri çekme işlemi basarisiz oldu');
      }
      const data = await response.json();
      setData(data);
    } 
    catch(err){
      setError(err.message);
    } 
    finally{
      setLoading(false);
    }
  };
  //async: 
  //Promise döndürür
  //asenkron işlemler belirli bir süre alabilecek işlemlerdir
  //await:
  //Promise döndürür
  //js Promise'in tamamlanmasını bekler
  //kodun sıralı şekilde çalışması sağlanır

  //api'den veri çekme işlemi
  useEffect(() => {fetchData();},[]); 

  //yüklenme durumu
  if(loading){
    return <div>yükleniyor...</div>;
  }

  //hata durumu
  if(error){
    return <div>hata: {error}</div>;
  }

  //veri gösterimi
  return (
    <>
      <Header/>
      <div className='container'>
        <h3 className='image-title'>{data.title.toLowerCase()}</h3>
        <img className='image' src={data.url} alt={data.title}/>
        <p className='image-explanation'>{data.explanation.toLowerCase()}</p>
      </div>
      <Footer/>
    </>
  );
}

export default App;