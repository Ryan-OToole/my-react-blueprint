import React, { Component } from 'react';
import '../App.css';
import Sidebar from './Sidebar'
import CreatePoemForm from './CreatePoemForm'
import DisplayPoem from './DisplayPoem'
import { connect } from "react-redux"
import UpdatePoemForm from './UpdatePoemForm'
import MarkovMaker from './MarkovMaker'
import MarkovMade from './MarkovMade'
import {Grid, Segment} from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import Adapter from '../Adapter'
import { setPoemList, setDisplayType, setCurrentPoem } from '../actions/index'

class PoemContainerAll extends Component {

  renderDisplayType = () => {
    switch(this.props.displayType) {
        case "display":
          return <DisplayPoem />
        case "create":
          return <CreatePoemForm />
        case "update":
          return <UpdatePoemForm />
        default:
          return null
    }
  }

  componentDidMount() {
      Adapter.getPoemsAll()
      .then( poems => {
        const poemList = []
        for (let poem of poems){
          poemList.push(poem)
        }
        const poemListReady = poemList.filter( poem =>  poem.id != 38 && poem.id != 36 && poem.id != 32)
        this.props.setPoemList(poemListReady)
        this.props.setDisplayType("")
      })

}

  render() {
    return (
      <div>
      {this.props.currentUser ?
        <Grid columns={3} divided>
         <Grid.Row stretched>
           <Grid.Column centered="true">
             <Segment><Sidebar /></Segment>
           </Grid.Column>
           <Grid.Column>
             <Segment>{ this.renderDisplayType() }</Segment>
           </Grid.Column>
           <Grid.Column>
             <Segment>  <MarkovMaker /> <MarkovMade /> </Segment>
           </Grid.Column>
         </Grid.Row>
       </Grid>
       :
       <h3>Please Register and/or Login </h3>
     }
      </div>
    )
  }
}



function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    displayType: state.displayType,
    poemList: state.poemList
  }
}

function mapDispatchToProps(dispatch) {
    return {
  setPoemList:(poemsArr) => {
    dispatch(setPoemList(poemsArr))
  },
  setCurrentPoem:(poem) => {
    dispatch(setCurrentPoem(poem))
  },
  setDisplayType:(string) => {
    dispatch(setDisplayType(string))
    }
  }
}




export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PoemContainerAll))
