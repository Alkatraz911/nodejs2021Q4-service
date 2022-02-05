Application starting

1.  Clone repo
2. Switch nest branch
3. run npm install
4. run docker compose up
5. open one more powershell and run tests (npm run test:auth)

default login - admin, password - admin. 
App can be run in 2 modes: express and fastify. You can switch it at .env file USE_FASTIFY option. 
Logs are stored at volumes - \\wsl$\docker-desktop-data\version-pack-data\community\docker\volumes
To load file you need log in and then post form-data with key file to endpoint /file
To get file you need to go to any browther and load url localgost:3000/file/name_of_file

BaltazaVR  Alkatraz911#8711 - For questions. 


Artilery Test 

EXPRESS  

http.codes.401:  250      
http.requests:  250      
http.response_time:                                                                       
  min:  1          
  max:  17         
  median:  4          
  p95:  10.1       
  p99:  13.1       
http.responses:  250      
vusers.completed:  50       
vusers.created:  50       
vusers.created_by_name.Test users route:  50       
vusers.session_length:                                                                    
  min:  23.6      
  max:  63.9
  median:  29.1       
  p95:  51.9       
  p99:  53          

FASTIFY 

 http.codes.401: 250 
 http.request_rate:  28/sec    
 http.request_rate:  28/sec 
 http.requests:  250 
 http.response_time: 
  min:  2 
  max:  25 
  median:  3 
  p95:  7 
  p99:  10.9 
 http.responses: 250 
 vusers.completed:  50 
 vusers.created:  50 
 vusers.created_by_name.Test users route:  50 
 vusers.session_length: 
  min:  21 
  max:  86.3 
  median:  33.5        
  p95:  51.9 
  p99:  79.1 

  
  
  
  
  





  
  
  
  
  
