'use server'

import axios from 'axios';

export async function getMock(apiEndpoint: string){

  console.log('endpoint', apiEndpoint)

    const response = await axios.get(apiEndpoint)
    .then(function (response) {
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });;
    
    

    return response;
}