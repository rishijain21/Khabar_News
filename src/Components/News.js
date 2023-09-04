import React, { Component } from "react";
import NewsItems from "./NewsItems";
// import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

import PropTypes from 'prop-types'

    
export class News extends Component {
    
    static defaultProps={
        country:'in',
        pageSize: 8,
        category :'general',

    }

    static propTypes={
        country: PropTypes.string,
        pageSize : PropTypes.number,
        category :PropTypes.string,
        
    }

    constructor(props){
        super(props);
        this.state={
            articles : [],
            loading: false,
            page: 1
        }
        document.title = `Khabar - ${this.capitalizeFirstLetter(this.props.category)}` 
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

   async componentDidMount(){            //This Method runs when Render is Run Priority == constructor>render>CDM

        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3ae9e72c2e1c40c789efef6de548608a&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        // console.log(data);
        let parsedData = await data.json();
        // console.log(parsedData);
        this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults});

    }


    handlePrevClick = async ()=>{
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3ae9e72c2e1c40c789efef6de548608a&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        // console.log(data);
        let parsedData = await data.json();
        // console.log(parsedData);
        this.setState({articles:parsedData.articles});

        this.setState({

            page: this.state.page -1

            
        })

    }
    handleNextClick =  async  () =>{
        // if(this.state.page + 1 > Math.ceil(this.totalResults/20)){

        // }
  

        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3ae9e72c2e1c40c789efef6de548608a&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        // console.log(data);
        let parsedData = await data.json();
        // console.log(parsedData);
        this.setState({articles:parsedData.articles});

        this.setState({

            page: this.state.page +1

            
        })
    
        
    }
  render() {
    return (
      <div className="container" >
        <h2 className="text-center">Top Khabar -  {this.capitalizeFirstLetter(this.props.category)}</h2>


       {/* <Spinner/> */}
       <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >

        <div className="row">
            <div className="\"/>

        {this.state.articles.map((element)=>{
        
           return <div className="col-md-4" key={element.url}>
            <NewsItems  title={element.title ? element.title.slice(0,45):""} description={element.description?element.description.slice(0,90):""} imgUrl={element.urlToImage}
           newsUrl = {element.url} publishedAt = {element.publishedAt} source ={element.source.name}/>
          </div>
          
        })}
          </div>
          </InfiniteScroll>
        
        <div className="container">
        <div className="d-flex justify-content-between">

        <button disabled={this.state.page<=1} type="button" className="btn btn-danger" onClick={this.handlePrevClick}>&larr; Privous </button>
        <button disabled ={this.state.page + 1 > Math.ceil(this.totalResults/this.props.pageSize)} type="button" className="btn btn-success"onClick={this.handleNextClick}>Next &rarr;</button>
</div>
</div>
        </div>
       



       


    );
  }
}

export default News;
