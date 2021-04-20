/*eslint-disable*/
import { Link } from "react-router-dom";
import React, { Component } from 'react';
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import axios from 'axios'
import SweetAlert from 'sweetalert2-react';;

class Dashboard extends React.Component{
  constructor (props){
    super(props);
    this.state = {
      items: [],
      page: 1,
      show: false,
      message: '',
      showBookmark: false,
      messageBookmark: ''
    }
  }
  infiniteScroll = () => {
    

    // End of the document reached?
    if ((window.innerHeight + window.pageYOffset)
      >= document.body.offsetHeight)
    {
      let newPage = this.state.page;
      newPage++;
      this.setState({
        page: newPage
      });
      
      this.fetchMoreData(newPage);
    }
  }
  componentDidMount(){
    window.addEventListener('scroll', this.infiniteScroll);
    this.fetchMoreData(this.state.page)
  
  }
  fetchMoreData = (newPage) => {
      const apiUrl = 'https://zax5j10412.execute-api.ap-southeast-1.amazonaws.com/dev/api/product/list?page='+newPage   ;
        axios.get(apiUrl).then((repos) => {
            const allRepos = repos.data.value.products;
            this.setState({
                items: [...this.state.items,...allRepos],
                page: newPage
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
            <div className="container mx-auto items-center flex flex-wrap">
            <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">

            </div>
            </div>

            <img
            className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
            src={require("assets/img/pattern_react.png").default}
            alt="..."
            />
        </section>

        <section className="mt-48 md:mt-40 pb-40 relative bg-blueGray-100">
            <div className="container">
                <div className="row justify-content-center">
                    {
                        items.map(item => {
                            return ( 
                                <div className="col-lg-4 col-md-6 mb-lg-0 my-4">
                                    <div className="card shadow-sm border-0 rounded h-100 d-flex flex-column shadow-sm">
                                        <Link to={{pathname:"/detail", data:item.id}} style={{ textDecoration: 'none',color: 'black' }}>
                                        <div className="card-body p-2"><img src={item.image} alt="" className="w-25 card-img-top mx-auto" />
                                            <div className="p-2">
                                                <h5 className="mt-auto">{item.name}</h5>
                                                <p className="mt-auto">{item.grapeVarietes}</p>
                                            </div>
                                        </div>
                                        </Link>
                                        <div className="card-footer bg-transparent text-muted border-0 ">
                                        <Link to={{pathname:"/detail", data:item.id}} style={{ textDecoration: 'none',color: 'black' }}>
                                            <div className="d-flex justify-content-between">
                                                <h5 className="mt-auto">$ {item.price}</h5>
                                                {
                                                    item.qty <= 5 ? 
                                                    <h5 className="mt-auto">Left : {item.qty}</h5> :
                                                    null  
                                                }
                                            </div>
                                        </Link>
                                            <div className="d-flex justify-content-between">
                                                <button type="button" className="btn btn-primary" onClick={() => this.setState({ show: true,message:item.name })}>ADD TO CARD</button>
                                                <button type="button" className="btn btn-primary" onClick={() => this.setState({ showBookmark: true,messageBookmark:item.name })}><i className="fas fa-bookmark"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
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
export default Dashboard;
