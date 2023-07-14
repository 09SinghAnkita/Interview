import fetchProducts from '../services/service'
import { useEffect, useState } from 'react'
import './tableStyles.css';

const Table = () => {
  const [products, setProducts] = useState([]);
  const [userInput, setUserInput] = useState('');
  const total = products.reduce((a, c) => a + c.revenue, 0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);


  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    const prod = products.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setProducts(prod);
  };

  return (
    <>
      <div className="container">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>NAME  &nbsp;&nbsp; <input type="text" value={userInput} onChange={handleInputChange} placeholder="Search by name" /></th>
                <th> REVENUE</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div className="container">
        <div className="table-container">
          <table>

            <tbody>
              {products.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.revenue}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
      <div className="container">
        <div className="table-container">
          <table>
            <tr>
              <th>TOTAL REVENUE</th>
              <th>{total}</th>
            </tr>
          </table>
        </div>
      </div>
    </>

  )

}

export default Table