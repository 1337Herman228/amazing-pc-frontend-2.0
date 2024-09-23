'use client';

import { ICategoryPc, IPcCategoryInfo } from '@/interfaces/types';
import './PcCatalog.scss'
import PcCatalogCard from "@/components/cards/pc-catalog-card/PcCatalogCard";

interface PcCatalogProps {
    categories: IPcCategoryInfo[]
    products_list: ICategoryPc[]
    is_notebook?: boolean
}

const PcCatalog = ({categories, products_list, is_notebook = false}: PcCatalogProps) =>{

     return(
          <section className='_catalog'>
               {categories.map((category) => {
                    return(
                    <div key={category.category_id} className='_catalog-body container section'>
                         <div className={categories.length > 1 ? '_catalog-body__header' : 'display-none'}>
                              <div className='header-top'>
                                   <h2 className='header-top__title'>
                                        <div>
                                             {category.category_name}
                                        </div>
                                   </h2>
                                   <div>
                                        <img
                                             className='header-top__arrow'
                                             src='/arrow-top-right.svg'
                                             width={40}
                                             height={40}
                                             alt=''
                                             loading='lazy'
                                        />
                                   </div>
                              </div>
                              <div className='header-bottom'>
                                   <p>{category.category_description}</p>
                              </div>
                         </div>
                         <main className='_catalog-body__main'>
                              {products_list.filter((item) => item.category_id === category.category_id).map((item) => 
                                   <PcCatalogCard key={item._id} pc={item} isNotebook={is_notebook}/>
                              )}
                         </main>
                    </div>
                    )
               })}
          </section>
     )
}

export default PcCatalog