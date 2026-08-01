// CURD operation for products schema


// const db = require ('../db/database');

// const productschema = {};



// import db from '../db/database.js';
import prismaclient from '../db/database.js'


// READ operation
export async function getSingleProduct (id){
     try{
        const response = {};

        let rows = await prismaclient.$queryRaw `select * from product where id = ${id}`;

        for (let key in rows[0]){
                if (process.env.NODE_ENV==='production'){
                        
                    if (typeof(key)==='string' && (key ==='overview'|| key ==='nutri_research'||key==='nutrition'||key ==='direction'||key ==='faq')){
                        response[key] = JSON.parse(rows[0][key]);
                    }else{
                        response[key]= rows[0][key];
                    }

                }else{
                        response[key]= rows[0][key];
                }
            }
    

        // find all images of product id
        const images_link = {};
        rows = await prismaclient.$queryRaw `select i.image_position,i.image_link
                                        from product p join images i
                                        on p.id = i.p_id
                                        where p.id = ${id}`;

        rows.forEach((element)=>{
            images_link[element.image_position] = element.image_link;  
        });

        return response;

    }catch (err){
        console.log(err);
        throw err;
    }
    
}


export async function getListOfProduct (page,limit){
 
     try{
       
        let offset = ( page -1 )*limit;
        
        
        const tupples = await db.executeQuery(`select p.id,p.p_name,p.short_info,i.image_link
                                from product p join images i
                                on p.id = i.p_id
                                where i.image_position ='profile'
                                limit ${offset},${limit};`,[],
                                (rows,field)=>rows
        );
      
        return tupples;
    }catch (err){
        // logger.log({
        //     tag  : "product.db",
        //     data : err,
        // },process.env.DATABASE);
        throw err;
        
    }

}



const BASEID = Number(process.env.BASE_PRODUCT_ID);

export async function getListOfProduct_Optimized_ (lastvisit){


    if ( lastvisit === 0){
        // return first page
        const tupple = await db.executeQuery(`select p.id,p.p_name,p.short_info,i.image_link
                                              from product p join images i
                                              on p.id = i.p_id
                                              where i.image_position ='profile'
                                              limit ${process.env.PAGE_SIZE}`,[],
                                              (r,f)=>r);

                                            //   console.log(tupple);
        return tupple;
    }else{
        // return second page onwards
    
        if (BASEID !=null &&  lastvisit >= BASEID){
           
            const tupple = await db.executeQuery(`select p.id,p.p_name,p.short_info,i.image_link
                                              from product p join images i
                                              on p.id = i.p_id
                                              where i.image_position ='profile' and p.id > ?
                                              limit ${process.env.PAGE_SIZE}`,[lastvisit],
                                              (r,f)=>r);

            return tupple;
        }else{
            return [];
        }
        
    }
}







// module.exports =  productschema;