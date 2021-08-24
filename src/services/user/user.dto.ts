import {IsAlpha, IsDefined, IsEmail} from 'class-validator'

export default class CreateUserDto{

    @IsAlpha()
    @IsDefined()
    public firstName: string;

    @IsAlpha()
    @IsDefined()
    public lastName: string;

    @IsEmail()
    @IsDefined()
    public emailAddress: string;

    public phoneNumber: string;

    public isMember: boolean;

    public localChurch: string;


}