import React from 'react';

export default function PriceChart() {
  return (
    <div className="price-chart shape background">
      Chart
      <Price />
    </div>
  );
}

function Price() {
  return <div className="price background">Price</div>;
}
