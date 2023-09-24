
import "./index.css"
const ProjectCard=(props)=>{
     const{projectdetails}=props
     const{imageUrl,name,id}=projectdetails
    return(
        <li className="Project-card" key={id}>
          <img src={imageUrl} alt={name} className="project-image"/>
          <p> {name} </p>
        </li>
    )
}
export default ProjectCard