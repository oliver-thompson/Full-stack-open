import React from 'react'

const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => {
  const exercises = parts.map(part => part.exercises)
  const sum = 0;

  const total = exercises.reduce((prev, curr) => prev + curr, sum);

  return(
    <h4>
      total of {total} exercises
    </h4>
  ) 
}
  

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <div>
    {parts.map(part =>
      <Part key={part.id} part={part} />
    )}
  </div>


const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }


export default Course