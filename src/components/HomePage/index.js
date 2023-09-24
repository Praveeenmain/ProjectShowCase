import {Component} from 'react'
import "./index.css"
import ProjectCard from '../ProjectCard'
import {NavBar,WebsiteLogo,HomePageContainer} from './styledComponents'
import Loader from 'react-loader-spinner'

  const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}


class HomePage extends Component{
 
  
    state={
       projectsList:[],
       id:categoriesList[0].id,
        apiStatus: apiStatusConstants.initial,
    
    }

   
  
    componentDidMount(){
      this.getCatergoryDetails()
    }
   
    getCatergoryDetails=async()=>{
      this.setState({apiStatus: apiStatusConstants.inProgress})
      const {id}=this.state
      const apiUrl=`https://apis.ccbp.in/ps/projects?category=${id}`
      const response= await fetch(apiUrl)
      if(response.ok){
           const data=await response.json()
           const{projects}=data
           const updateddata=projects.map(eachProject=>({
                  id:eachProject.id,
                  imageUrl:eachProject.image_url,
                  name:eachProject.name
           }))
         
          this.setState({
            projectsList:updateddata,
              apiStatus: apiStatusConstants.success,
              
          })
           
      }else{
         this.setState({
        apiStatus: apiStatusConstants.failure,
      })
      }
  
      
    
     
     
    
    }
    onClickRetry=()=>{
      this.getCatergoryDetails()
    }
    renderSuccessView =()=>{
      const{projectsList}=this.state
      return(
        <ul className="projects-cards-container">
          {
            projectsList.map(each=>(
              <ProjectCard projectdetails={each} key={each.id} />
            ))
          }
        </ul>
      )
    }
     
     renderFailure=()=>{
        return(
            <div className="failure-image-container">
               <img src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png" className="failure-image" alt="failure view"/>
               <h1 className="failure-para"> Oops! Something Went Wrong</h1>
               <p> We cannot seem to find the page you are looking for</p>
               <button type="button" onClick={this.onClickRetry} className="retry-button"> Retry</button>
            </div>
 
          )
    }
     renderloader=()=>{
        return(
            <div className="loader-Home-container" data-testid="loader">
              <Loader type="Three dots" color="#0284C7" height={50} width={50} />
            </div>
            )
     }
   
    checkApiStatus = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderloader()
      case apiStatusConstants.failure:
        return this.renderFailure()

      default:
        return null
    }
  }
    

  
   
    
    
    render(){
      
   
        const onChange=(event)=>(
             this.setState({
              id:event.target.value
             },()=>this.getCatergoryDetails())
        )
 
        
      
     return(
       <HomePageContainer>
        <NavBar> 
           <WebsiteLogo src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png" alt="website logo"/>
        </NavBar>

        <select onChange={onChange} className="Select-container">
          
           {
            categoriesList.map(each=>(
              
                      <option value={each.id} key={each.id}> {each.displayText} </option>
                       
            ))
           }
        </select>
         {
        this.checkApiStatus()
         }



      
      </HomePageContainer>









    
     )
    }
}
export default HomePage