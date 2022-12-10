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
        </>
    )
}

export default Course