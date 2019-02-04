package com.ibm.test.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.ibm.test.Model.BankCard;

public interface BankCardRepository extends CrudRepository<BankCard, Long> {

	@Query("select bc from BankCard bc inner join bc.bcCustomerIdFk c where c.cIdPk = ?1")
	List<BankCard> findByCustomerId(long customerId);
}
