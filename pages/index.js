import React, { Component } from 'react';
class Index extends Component {
    state = {  }
    render() {
        return ( <h1> This is front end</h1> );
    }
}

export default Index;

// import React from "react";
// import axios, { post } from "axios";
// class BulkUpload extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       file: null
//     };
//     this.onFormSubmit = this.onFormSubmit.bind(this);
//     this.onChange = this.onChange.bind(this);
//     this.fileUpload = this.fileUpload.bind(this);
//   }
//   onFormSubmit(e) {
//     e.preventDefault(); // Stop form submit
//     this.fileUpload(this.state.file).then(response => {
//       console.log(response.data);
//     });
//   }
//   onChange(e) {
//     this.setState({ file: e.target.files[0] });
//   }
//   fileUpload(file) {
//     const url = "http://localhost:5000/api/products/bulk_upload";
//     const formData = new FormData();
//     formData.append("file", file);
//     const config = {
//       headers: {
//         "content-type": "multipart/form-data"
//       }
//     };
//     return post(url, file, config);
//   }

//   downloadBulkUploadTemplete = () => {
//     fetch("/excel.xlsx").then(response => {
//       response.blob().then(blob => {
//         let url = window.URL.createObjectURL(blob);
//         let a = document.createElement("a");
//         a.href = url;
//         a.download = "muhalik bulk-upload templete.xlsx";
//         a.click();
//       });
//     });
//   };
//   render() {
//     return (
//       <div>
//         <row>
//           <form onSubmit={this.onFormSubmit}>
//             <div>
//               <input type="file" onChange={this.onChange} />
//             </div>
//             <div>
//               <button variant="primary" size="md" active type="submit">
//                 Upload
//               </button>
//             </div>
//           </form>
//         </row>
//       </div>
//     );
//   }
// }
// export default BulkUpload;
