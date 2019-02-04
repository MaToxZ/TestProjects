package com.ibm.test.Interface;

import java.util.List;

import com.ibm.test.Model.CardConsumption;


public interface CardConsumptionServiceLocal {

	boolean createAndUpdate(CardConsumption cardConsumption);

	boolean delete(long cardConsumptionId);

	List<CardConsumption> findAll();

	CardConsumption find(long cardConsumptionId);

	List<CardConsumption> findByBankCardId(long bankCardId);

}
