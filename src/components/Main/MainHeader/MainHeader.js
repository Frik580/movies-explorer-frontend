import "./MainHeader.css";

function MainHeader({ title }) {
  return (
    <div className="mainheader">
     <h2 className="mainheader__title">{title}</h2>
     <div className="mainheader__border"></div>
    </div>
  );
}

export default MainHeader;