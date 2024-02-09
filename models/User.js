import { mongoose } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    token:{
        type:String,
    },
    confirm:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
}
);

//Pre es un midalware que se ejecuta antes de que se guardan los registros
userSchema.pre('save',async function(next){
    //Si no esta modificando el password no lo vuelvas a hashear
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

//creamos funciones 
userSchema.methods.findPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password);

}

const User = mongoose.model('User',userSchema)
export default User