package com.ibm.test.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.test.Interface.CustomerServiceLocal;
import com.ibm.test.Model.Customer;
import com.ibm.test.Repository.CustomerRepository;

@Service
public class CustomerService implements CustomerServiceLocal {

	@Autowired
	CustomerRepository customerRepository;

        /**
         * This method is used to create or update an Customer in DataBase, if the Customer object contains and cIdPk attribute
         * the incoming object will be updated otherwise will be created
         * @param customer Customer Object (POJO)
         * @return <code> true : false </code> depending if the transaction was successfully or failed.
         */
	@Override
	public boolean createAndUpdate(Customer customer) {
		if (customerRepository.save(customer) != null) {
			return true;
		} else {
			return false;
		}
	}

        /**
         * This method is use to delete an Customer in DataBase.
         * @param customerId Customer id to be deleted.
         * @return <code> true : false </code> depending if the transaction was successfully or failed.
         */
	@Override
	public boolean delete(long customerId) {
		try{
			customerRepository.deleteById(customerId);
			return true;
		}catch(Exception e){
			return false;
		}
	}

        /**
         * This method retrieve all the Customer in DataBase.
         * @return <code> Customer[] : null </code> depending on DataBase match. 
         */
	@Override
	public List<Customer> findAll() {
		List<Customer> customers = (List<Customer>) customerRepository.findAll();
		if(customers != null && customers.size() > 0) {
			return customers;
		}else {
			return null;
		}
	}

        /**
         * This method finds an Customer in BataBase based in the sent parameter
         * @param customerId Customer ID to find
         * @return <code> Customer : null </code> depending on DataBase match
         */
	@Override
	public Customer find(long customerId) {
		return customerRepository.findById(customerId).orElse(null); 
	}

}
