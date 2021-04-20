/*eslint-disable*/
import { Link } from "react-router-dom";
import React, { Component } from 'react';
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import axios from 'axios'
import SweetAlert from 'sweetalert2-react';;

class Detail     extends React.Component{
  constructor (props){
    super(props);
    this.state = {
      items: [],
      show: false,
      message: '',
      showBookmark: false,
      messageBookmark: ''
    }
  }
 
  componentDidMount(){
    console.log(this.props.location)
    this.fetchMoreData(this.props.location.data)
  
  }
  fetchMoreData = (id) => {
      console.log("res");
      const apiUrl = 'https://zax5j10412.execute-api.ap-southeast-1.amazonaws.com/dev/api/product/'+id   ;
        axios.get(apiUrl).then((repos) => {
            const allRepos = repos.data.value;
            // console.log('items',allRepos)
            this.setState({
                items: allRepos
            })
        });
  }
  render(){
      const {items} = this.state;
    return (
       
        <>
        <IndexNavbar fixed />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous"></link>
            <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
            <img
            className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
            src={require("assets/img/pattern_react.png").default}
            alt="..."
            />
        </section>

        <section className="mt-48 md:mt-40 pb-40 relative bg-blueGray-100">
            <div className="container py-5">
            <div className="d-flex bd-highlight my-4 shadow-sm" style={{ backgroundColor: 'white'}}>
                <div className="p-2 bd-highlight"><img src={items.image} alt="" className="w-75 mx-auto" />  </div>
                <div className="p-2 w-100 bd-highlight">
                    <h3 className="text-primary px-2">{items.name}</h3>
                    <h5 className="px-2">{items.grapeVarieties} {items.vintageYear}</h5>
                <div className="d-flex justify-content-between my-5 px-2">
                    <div><h4>S$ {items.price}</h4></div>
                    <div><button type="button" className="btn btn-primary mx-2" onClick={() => this.setState({ show: true,message:items.name })}>ADD TO CARD</button>
                         <button type="button" className="btn btn-primary mx-2" onClick={() => this.setState({ showBookmark: true,messageBookmark:items.name })}><i className="fas fa-bookmark"></i></button>
                    </div>
                </div>
                <hr />
                <div className="row px-2 text-primary">
                    <div className="col-sm">
                    <h5>Region</h5>
                    </div>
                    <div className="col-sm">
                    <h5>Producer</h5>
                    </div>
                    <div className="col-sm">
                    <h5>Bottle</h5>
                    </div>
                    <div className="col-sm">
                    <h5>Alcohol</h5>
                    </div>
                </div>
                <div className="row px-2">
                    <div className="col-sm">
                        <h6>{items.region}</h6>
                    </div>
                    <div className="col-sm">
                        <h6>{items.producer}</h6>
                    </div>
                    <div className="col-sm">
                        <h6>{items.bottleSize} ml</h6>
                    </div>
                    <div className="col-sm">
                        <h6>{items.alcohol} %</h6>
                    </div>
                </div>
                <hr />
                <div className="d-flex flex-column bd-highlight my-5 px-2">
                    <div className="bd-highlight text-primary"><h5>Desription</h5></div>
                    <div className="bd-highlight"><h6>{items.description}</h6></div>
                </div>
                <div className="d-flex flex-column bd-highlight my-5 px-2">
                    <div className="bd-highlight text-primary"><h5>Tasting Notes</h5></div>
                    <div className="bd-highlight"><h6>{items.tastingNotes}</h6></div>
                </div>
                </div>
                <SweetAlert
                    show={this.state.show}
                    text={this.state.message+" is added to cart"}
                    onConfirm={() => this.setState({ show: false })}
                />
                <SweetAlert
                    show={this.state.showBookmark}
                    text={this.state.messageBookmark+" is bookmarked"}
                    onConfirm={() => this.setState({ showBookmark: false })}
                />
            </div>
            </div>
            </section>
            <Footer />
            </>
        );
    }
}
export default Detail;
