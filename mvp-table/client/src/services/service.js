const fetchProducts = async () => {
  try {
    const branch1 = fetch('http://localhost:3000/branch1');
    const branch2 = fetch('http://localhost:3000/branch2');
    const branch3 = fetch('http://localhost:3000/branch3');

    const results = await Promise.all([branch1, branch2, branch3]);
    const data = await Promise.all(results.map(response => response.json()));

    let products = [...data[0].products, ...data[1].products, ...data[2].products];
    products = [...new Set(products.map(item => item.id))].map(id => products.find(item => item.id === id));
    products = products.map(item => {
      item['revenue'] = item.unitPrice * item.sold;
      return item;
    });

    return products.sort((a, b) => a.name.localeCompare(b.name));
  } catch (err) {
    console.error(err);
  }
}

export default fetchProducts;
