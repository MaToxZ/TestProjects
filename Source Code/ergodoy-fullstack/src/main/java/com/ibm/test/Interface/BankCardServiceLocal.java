package com.ibm.test.Interface;

import java.util.List;

import com.ibm.test.Model.BankCard;

public interface BankCardServiceLocal {

	boolean createAndUpdate(BankCard bankCard);
	
	boolean delete(long bankCardId);
	
	List<BankCard> findAll();
	
	BankCard find(long bankCardId);
	
	List<BankCard> findByCustomerId(long customerId);
		
}
