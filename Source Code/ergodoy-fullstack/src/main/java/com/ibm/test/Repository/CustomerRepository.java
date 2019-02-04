package com.ibm.test.Repository;

import org.springframework.data.repository.CrudRepository;

import com.ibm.test.Model.Customer;

public interface CustomerRepository extends CrudRepository<Customer, Long>{

}
