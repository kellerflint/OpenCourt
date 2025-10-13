import passport from 'passport'
import { Strategy as LocalStrategy} from 'passport-local'
import bcrypt from 'bcryptjs'
import {User} from '../model/user.js'

