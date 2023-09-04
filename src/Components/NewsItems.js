import React, { Component } from "react";

export class NewsItems extends Component {
    
  render() {
    let { title, description, imgUrl,newsUrl,publishedAt,source} = this.props;
    return (
      <div className="my-3">
        <span className="badge rounded-pill bg-danger">{source}</span>

        <div className="card"  style={{ width: "20rem" }} >
          
          <img src={imgUrl} className="card-img-top" alt="..." />
          
          <div className="card-body">
            
            <h5 className="card-title">{title}
            ...</h5> 
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">On {new Date(publishedAt).toGMTString()} </small></p>
            <a href={newsUrl} target = '_blank'  rel="noreferrer" className="btn-sm btn-dark">
              Read More{" "}
            </a>
          </div> 
        </div>
      </div>
    );
  }
}

export default NewsItems;
