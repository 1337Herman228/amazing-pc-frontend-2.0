'use client';

import { ICategoryPc } from '@/interfaces/types';
import './PcCatalogCard.scss';
import Link from "next/link"

const Img = ({src}:{src:string}) => {
     return(
          <img
               className='component__img'
               src={src}
               width={20}
               height={20}
               alt=''
               loading='lazy'
          />
     )
}

interface PcCatalogCardProps {
    pc: ICategoryPc
    isNotebook: boolean
}

const PcCatalogCard = ({pc, isNotebook}: PcCatalogCardProps) => {
     return(
          <div className='pc-card-container'>
               <Link href={pc.link_to_pc}>
               <div className='pc-card'>
                    <div className='pc-card__mark-div'>
                         <span className='pc-card__mark mark'>
                              {pc.amount_of_configurations} комплектации
                         </span>
                    </div>
                    <img
                         className='pc-card__img'
                         src={pc.img}
                         width={200}
                         height={300}
                         alt={pc.name}
                         loading='lazy'
                    />
                    <div className='pc-card__info'>
                         <div className='pc-card__info-title-and-price'>
                              <h3 className='pc-card__info-title'>{pc.name}</h3>
                              <div className='pc-card__info-price'>От {pc.min_price} BYN</div>
                         </div>
                         <span className='pc-card__info-description'>{pc.description}</span>
                    </div>    
                    <hr/>
                    <ul className='pc-card__configuration-list'>
                         <li className='component'>
                              <Img src='/gaming-pc/components-svg/gpu.svg'/>
                              <div className='component__name'>{pc.gpu_description}</div>
                         </li>
                         <li className='component'>
                              <Img src='/gaming-pc/components-svg/cpu.svg'/>
                              <div className='component__name'>{pc.cpu_description}</div>
                         </li>
                         <li className={isNotebook ? 'display-none' : 'component'}>
                              <Img src='/gaming-pc/components-svg/mb.svg'/>
                              <div className='component__name'>{pc.mb_description}</div>
                         </li>
                         <li className='component'>
                              <Img src='/gaming-pc/components-svg/ram.svg'/>
                              <div className='component__name'>{pc.ram_description}</div>
                         </li>
                         <li className='component'>
                              <Img src='/gaming-pc/components-svg/ssd.svg'/>
                              <div className='component__name'>{pc.ssd_description}</div>
                         </li>
                         <li className={isNotebook ? 'display-none' : 'component'}>
                              <Img src='/gaming-pc/components-svg/pow-sup.svg'/>
                              <div className='component__name'>{pc.power_supply_description}</div>
                         </li>
                    </ul>
               </div>
               </Link>
               <div className='card-buttons'>
                    <Link className={`card-buttons__link button-transparent-white ` + (isNotebook ? ' card-buttons__link--more-info-notebook' : 'card-buttons__link--more-info')} href={pc.link_to_pc}>
                         {isNotebook ? 'Подробнее' : 'Подробнее о модели'}
                    </Link>
                    <Link className={`card-buttons__link card-buttons__link--configurator green-filled-link ` + (isNotebook ? 'display-none' : '')} href={pc.link_to_configurator}>
                         <img
                              className='card-buttons__link__svg'
                              src='/setting-2.svg'
                              width={24}
                              height={24}
                              alt='configurator'
                              loading='lazy'
                         />
                         
                         <span className='card-buttons__link__text'>
                              Конфигуратор
                         </span>
                    </Link>
               </div>
          </div>
     )
}

export default PcCatalogCard