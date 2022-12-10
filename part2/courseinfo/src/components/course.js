const Course = ({course}) => {
    const parts = course.parts
    return (
        <>
            <h1>{course.name}</h1>
            {parts.map(x => 
                <p key={x.id}>
                    {x.name + " " + x.exercises.toString()}
                </p>
            )}
            <h4>total of {parts.map(x=>x.exercises).reduce((total, current) => total+current, 0)} exercises</h4>
        </>
    )
}

export default Course