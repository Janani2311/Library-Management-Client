import React from 'react'  
import Card from '@mui/material/Card';  
import CardContent from '@mui/material/CardContent';  
import CardMedia from '@mui/material/CardMedia';  
import Typography from '@mui/material/Typography';  

function Feed({ formData }) {  
  if (!formData || Object.keys(formData).length === 0) {  
    return <div>No book details available</div>; // or some placeholder/message  
  }  

  return (  
    <div className='mt-8'>  
      <Card className="max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden">  
        <CardMedia  
          className="h-40"  
          image={formData.image || '/books/dummy.jpeg'}   
          title={formData.title || 'Book Image'}   
        />  
        <CardContent className="p-4">  
            {[  
              { label: 'Title', value: formData.title },  
              { label: 'Author', value: formData.author },  
              { label: 'Description', value: formData.description },  
              { label: 'ISBN', value: formData.isbn },  
              { label: 'Published Date', value: formData.publishedDate },  
              { label: 'Publisher', value: formData.publisher },  
              { label: 'Page Count', value: formData.pageCount },  
              { label: 'Language', value: formData.language },  
              { label: 'No of Books Available', value: formData.numBooksAvailable },  
            ].map(({ label, value }) => (  
              <div key={label} className="border-b border-gray-600 pb-2 mb-6 flex gap-4">  
                <Typography variant="body2" className="text-gray-700 font-semibold">  
                  {label}:  
                </Typography>  
                <Typography variant="body2" className="text-gray-600">  
                  {value}  
                </Typography>  
              </div>  
            ))}  
        </CardContent>    
      </Card>  
    </div>  
  )  
}  

export default Feed;




// import React, { useEffect } from 'react'
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

// function Feed({formData}) {
//     //console.log(formData)
//     let dummyText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat nesciunt similique accusamus, necessitatibus fugiat qui illo? Esse, laboriosam. Maiores repudiandae ipsum deleniti inventore ipsa mollitia alias, impedit ducimus eligendi deserunt."

//   return <>
//   <div className='mt-8'>
//   <Card className="max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden">  
//       <CardMedia  
//         className="h-40"  
//         image={formData.image || '/books/dummy.jpeg'} 
//         title={formData.title || 'Book Image'}  
//         onError={(e) => {  
//           e.target.onerror = null; // prevents looping  
//           e.target.src = '/images/dummy.jpeg'; // fallback  
//       }} 
//       />  
//       <CardContent className="p-4">  
        
//         <div className="border-b border-gray-600 pb-2 mb-6 flex gap-4">  
//           <Typography variant="body2" className="text-gray-700 font-semibold text-3xl  capitalize">  
//             Title:  
//           </Typography>  
//           <Typography variant="body2" className="text-gray-600">  
//             {formData.title}  
//           </Typography>  
//         </div>  
        
//         <div className="border-b border-gray-600 pb-2 mb-6 flex gap-4">  
//           <Typography variant="body2" className="text-gray-800 font-semibold">  
//             Author:  
//           </Typography>  
//           <Typography variant="body2" className="text-gray-700">  
//             {formData.author}  
//           </Typography>  
//         </div>  

//         <div className="border-b border-gray-600 pb-2 mb-6 flex gap-4">  
//           <Typography variant="body2" className="text-gray-700 font-semibold text-3xl  capitalize">  
//             Description:  
//           </Typography>  
//           <Typography variant="body2" className="text-gray-600">  
//             {formData.description}  
//           </Typography>  
//         </div>  

//         <div className="border-b border-gray-600 pb-2 mb-6 flex gap-4">  
//           <Typography variant="body2" className="text-gray-700 font-semibold text-3xl  capitalize">  
//             ISBN:  
//           </Typography>  
//           <Typography variant="body2" className="text-gray-600">  
//             {formData.isbn}  
//           </Typography>  
//         </div>  

//         <div className="border-b border-gray-600 pb-2 mb-6 flex gap-4">  
//           <Typography variant="body2" className="text-gray-700 font-semibold text-3xl  capitalize">  
//             Published Date:  
//           </Typography>  
//           <Typography variant="body2" className="text-gray-600">  
//             {formData.publishedDate}  
//           </Typography>  
//         </div>  

        
//         <div className="border-b border-gray-600 pb-2 mb-6 flex gap-4">  
//           <Typography variant="body2" className="text-gray-700 font-semibold text-3xl  capitalize">  
//             Publisher:  
//           </Typography>  
//           <Typography variant="body2" className="text-gray-600">  
//             {formData.publisher}  
//           </Typography>  
//         </div>

//         <div className="border-b border-gray-600 pb-2 mb-6 flex gap-4">  
//           <Typography variant="body2" className="text-gray-700 font-semibold text-3xl  capitalize">  
//             Page Count:  
//           </Typography>  
//           <Typography variant="body2" className="text-gray-600">  
//             {formData.pageCount}  
//           </Typography>  
//         </div>

//         <div className="border-b border-gray-600 pb-2 mb-6 flex gap-4">  
//           <Typography variant="body2" className="text-gray-700 font-semibold text-3xl  capitalize">  
//             Language :
//           </Typography>  
//           <Typography variant="body2" className="text-gray-600">  
//             {formData.language}  
//           </Typography>  
//         </div>

//         <div className="border-b border-gray-600 pb-2 mb-6 flex gap-4">  
//           <Typography variant="body2" className="text-gray-700 font-semibold text-3xl  capitalize">  
//             No of books available:
//           </Typography>  
//           <Typography variant="body2" className="text-gray-600">  
//             {formData.numBooksAvailable}  
//           </Typography>  
//         </div>
//       </CardContent>    
//     </Card>  
//     </div>
//     </>
// }
// export default Feed