import ReviewItem from './ReviewItem'

const ReviewItems = ({ items }) => {
  if (!items?.length) return null

  const sections = [
    {
      items: items.filter(r => r.grade === 'correct'),
      title: 'These were right',
      titleColor: 'text-[#54CD76]'
    },
    {
      items: items.filter(r => r.grade === 'questioned'),
      title: 'These were questionable',
      titleColor: 'text-orange-400 dark:text-orange-300'
    },
    {
      items: items.filter(r => r.grade === 'needs'),
      title: 'These need work',
      titleColor: 'text-red-400'
    }
  ]

  return (
    <>
      {sections.map(section =>
        section.items.length > 0 && (
          <div key={section.title} className="mt-10">
            <h3 className={`${section.titleColor} text-xl uppercase font-bold`}>
              {section.title}
            </h3>
            <ul className="my-5">
              {section.items.map(item => (
                <ReviewItem key={item.id} review={item} />
              ))}
            </ul>
          </div>
        )
      )}
    </>
  )
}

export default ReviewItems
