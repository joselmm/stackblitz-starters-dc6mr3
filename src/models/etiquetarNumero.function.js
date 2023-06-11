function etiquetarNumero(num) {
  if (Math.abs(num) >= 1e9) {
    // Si el número es un billón o más grande
    const numRedondeado = Math.round(num / 1e9);
    return numRedondeado + 'B';
  } else if (Math.abs(num) >= 1e6) {
    // Si el número es un millón o más grande
    const numRedondeado = Math.round(num / 1e6);
    return numRedondeado + 'M';
  } else if (Math.abs(num) >= 1e3) {
    // Si el número es un mil o más grande
    const numRedondeado = Math.round(num / 1e3);
    return numRedondeado + 'K';
  } else {
    // Si el número es menor que mil
    return '' + num;
  }
}

export default etiquetarNumero;
