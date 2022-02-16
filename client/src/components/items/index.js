
export const Items = ({clothing}) => {
    return <>Items
        {clothing.map(e => <div>{e.name}</div>)}
    
    </>

}
