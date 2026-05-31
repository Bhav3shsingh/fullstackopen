const Header = ({name}) => {
  return (<h2>{name}</h2>);
}

const Part = ({part,exercise}) => {
  return(<p>
        {part} {exercise}
      </p>);
}

const Content = (props) => {

  return (
  <>
    {props.parts.map((p)=><Part key={p.id} part={p.name} exercise={p.exercises}/>)}
  </>
  );
}

const Total = (props) => {
  const parts = props.parts.parts;
  const total = parts.reduce((s,p)=>s+p.exercises,0)
  return(<p>Number of exercises {total}</p>);
}

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course} />
    </div>
  )
}

export default Course
