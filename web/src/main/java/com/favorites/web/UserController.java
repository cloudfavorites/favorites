package com.favorites.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.favorites.domain.Collect;
import com.favorites.domain.CollectRepository;
import com.favorites.domain.User;
import com.favorites.domain.UserRepository;
import com.favorites.domain.result.ExceptionMsg;
import com.favorites.domain.result.Response;
import com.favorites.utils.Const;
import com.favorites.utils.DateUtils;

@RestController
@RequestMapping("/user")
public class UserController extends BaseController{
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private CollectRepository collectRepository;
 
	@RequestMapping(value="/login",method=RequestMethod.POST)
	public Response login(User user) {
		logger.info("login begin, param is "+user);
		try {
			User loginUser=userRepository.findByUserNameOrEmail(user.getUserName(), user.getEmail());
			if(loginUser==null || !loginUser.getPassWord().equals(user.getPassWord())){
				return result(ExceptionMsg.LoginNameOrPassWordError);
			}
			getSession().setAttribute(Const.LOGIN_SESSION_KEY, loginUser);
			getSession().setAttribute(Const.LOGIN_SESSION_KEY, loginUser);
		} catch (Exception e) {
			// TODO: handle exception
			logger.error("login failed, ",e);
			return result(ExceptionMsg.FAILED);
		}
		return result();
	}
	
	@RequestMapping(value="/create",method=RequestMethod.POST)
	public Response create(User user) {
		logger.info("create user begin, param is "+user);
		try {
			user.setRegTime(DateUtils.getDateSequence());
			userRepository.save(user);
		} catch (Exception e) {
			// TODO: handle exception
			logger.error("create user failed, ",e);
			return result(ExceptionMsg.FAILED);
		}
		return result();
	}
	
	
	@RequestMapping(value="/collect",method=RequestMethod.POST)
	public Response login(Collect collect) {
		logger.info("collect begin, param is "+collect);
		try {
			collect.setDescription(collect.getDescription());
			collect.setUserId(getUserId());
			collect.setCollectTime(DateUtils.getDateSequence());
			collectRepository.save(collect);
		} catch (Exception e) {
			// TODO: handle exception
			logger.error("collect failed, ",e);
			return result(ExceptionMsg.FAILED);
		}
		return result();
	}
}