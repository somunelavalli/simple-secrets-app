app.post('/register' , (req,res) =>{

    bcrypt.hash(req.body.password, 12, function(err, hash) {
        // Store hash in your password DB.
        const newUser = new User({
            email: req.body.username,
            password: hash
        })
        newUser.save((err) =>{
            if(!err){
                res.render('secrets')
            }
        })
    });
   
})

app.post('/login' ,(req, res) =>{
    const username = req.body.username
    const password = req.body.password

    User.findOne({email: username}, (err,foundUser) =>{
        if(err){
            console.log(err)
        }else{
            if(foundUser){
                bcrypt.compare(password , foundUser.password , (err,result) =>{
                    if(result === true){
                        res.render('secrets')
                    }
                })
            }
        }
    })
})