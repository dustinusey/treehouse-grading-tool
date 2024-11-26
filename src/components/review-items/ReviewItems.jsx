import { cn } from '../../utils'
import ReviewItem from './ReviewItem'

const ReviewItems = ({ items, title, titleColor }) => {
  if (!items?.length) return null

  return (
    <div className="mt-10">
      <h3 className={cn('text-xl uppercase font-bold', titleColor)}>
        {title}
      </h3>
      <ul className="my-5">
        {items.map((item, index) => (
          <ReviewItem key={item.id || index} review={item} />
        ))}
      </ul>
    </div>
  )
}

export default ReviewItems
