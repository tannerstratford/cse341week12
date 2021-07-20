const socket = io('/') // This means your client will always be connected to your server, locally or on Heroku.

const errorContainer = document.getElementById('errMsg')
const usernameInput = document.getElementById('username')
const date = new Date()

// A simple async POST request function
const getData = async (url = '') => {
    const response = await fetch(url, {
        method: 'GET'
    })
    return response.json()
}

// A simple async POST request function
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

const getTime = () => {
    const d = new Date();

    const hours = d.getHours().toString().padStart(2, '0');
    const mins = d.getMinutes().toString().padStart(2, '0');

    return `${hours}:${mins}`;
}

// Login user to access chat room.
const login = async () => {
    /***********************************
     *         YOUR CODE HERE          *
     ***********************************/
     const username = usernameInput.value;

     errorContainer.innerHTML = '';
     if(!username||username.trim() === ''){
         errorContainer.innerHTML = 'Username cannot be empty';
         return;
     }

     const data = await postData('/login', {
         username,
     });

     if(data.error){
         errorContainer.innerHTML = data.error;
         return;
     }

     socket.emit('newUser', username, getTime());
     window.location = '/chat';
     console.log('should be redirecting to chat')
};
    //  var same = false
    //  for(var i = 0; i < users.length; i++){
    //      if(req.body.username == users[i]){
    //          same = true
    //      }
    //  }
    //  if(same){
    //      res.render('pages/pr12-login', {
    //          title: 'Prove Activity 12',
    //          path: '/proveActivities/12',
    //          same: true
    //      })
    //  }
    //  else{
    //      console.log("chat")
    //      res.render('pages/pr12-chat.ejs', {
    //          username: req.body.username
    //      })
    //  }

