import Image from 'next/image'
import InteractiveCard from './InteractiveCard'

export default function ProductCard({cwsName, imgSrc} : {cwsName: string, imgSrc: string}) {

  return (
    <InteractiveCard> 
      <div className='w-full h-[70%] relative rounded-t-lg'>
        <Image src={imgSrc} 
        alt='Product Picture'
        fill={true}
        className='object-cover rounded-t-lg' />
      </div>
      <div className='w-full h-[30%] p-[10px] text-slate-700 text-lg font-medium flex justify-center items-center'>
        {cwsName}
      </div>
    </InteractiveCard>
  )
}