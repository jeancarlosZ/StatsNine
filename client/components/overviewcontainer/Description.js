import React from 'react';

export default function Description() {
  return (
    <div className="flex-col shape background description space-around">
      <Header />
      <Text />
    </div>
  );
}

function Header() {
  return <div className="header ">Company Details:</div>;
}

function Text() {
  return (
    <div className="text center-self">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </div>
  );
}
