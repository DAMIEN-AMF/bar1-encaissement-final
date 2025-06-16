const addToCart = (product) => {
  setCart((prev) => {
    const updated = [...prev];
    const index = updated.findIndex((item) => item.name === product.name);
    if (index !== -1) {
      updated[index].quantity += 1;
    } else {
      updated.push({ ...product, quantity: 1 });
    }
    return updated;
  });
};
