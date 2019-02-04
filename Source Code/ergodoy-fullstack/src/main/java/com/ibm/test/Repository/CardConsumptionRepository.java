package com.ibm.test.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.ibm.test.Model.CardConsumption;

public interface CardConsumptionRepository extends CrudRepository<CardConsumption, Long> {

	@Query("select cc from CardConsumption cc inner join cc.ccBankCardIdFk bc where bc.bcIdPk = ?1")
	List<CardConsumption> findByBankCardId(long bankCardId);
}
