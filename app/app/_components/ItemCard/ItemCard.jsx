import './ItemCard.scss';

const ItemCard = ({data}) => {
  
  return (
    <div className='card'>
      {
        Object.entries(data).map(([key, value]) => {
          console.log(key, value)
          return (
            <div className='card__property'>
              <h3>{key}</h3>
              <p>{value}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default ItemCard
