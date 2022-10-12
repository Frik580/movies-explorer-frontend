import "./MainHeader.css";

function MainHeader({ title }) {
  return (
    <div className="mainheader">
     <h2 className="mainheader__title">{title}</h2>
     <p className="mainheader__border"></p>
    </div>
  );
}

export default MainHeader;