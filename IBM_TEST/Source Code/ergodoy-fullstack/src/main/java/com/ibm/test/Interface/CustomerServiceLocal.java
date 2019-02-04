package com.ibm.test.Interface;

import java.util.List;

import com.ibm.test.Model.Customer;

public interface CustomerServiceLocal {
	
	boolean createAndUpdate(Customer customer);
	
	boolean delete(long customerId);
	
	List<Customer> findAll();
	
	Customer find(long customerId);
	
	
}
