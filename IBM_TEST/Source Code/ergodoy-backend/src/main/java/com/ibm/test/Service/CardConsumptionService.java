package com.ibm.test.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.test.Interface.CardConsumptionServiceLocal;
import com.ibm.test.Model.CardConsumption;
import com.ibm.test.Repository.CardConsumptionRepository;

@Service
public class CardConsumptionService implements CardConsumptionServiceLocal {

	@Autowired
	CardConsumptionRepository cardConsumptionRepository;

        /**
         * This method is used to create or update a CardConsumption in DataBase, if the CardConsumption object contains and ccIdPk attribute
         * the incoming object will be updated otherwise will be created
         * @param cardConsumption CardConsumption Object (POJO)
         * @return <code> true : false </code> depending if the transaction was successfully or failed.
         */
	@Override
	public boolean createAndUpdate(CardConsumption cardConsumption) {
		if(cardConsumptionRepository.save(cardConsumption) != null) {
			return true;
		}else {
			return false;
		}
	}

        /**
         * This method is use to delete a CardConsumption in DataBase.
         * @param cardConsumptionId CardConsumption ID to be Deleted
         * @return <code> true : false </code> depending if the transaction was successfully or failed.
         */
	@Override
	public boolean delete(long cardConsumptionId) {
		try {
			cardConsumptionRepository.deleteById(cardConsumptionId);
			return true;
		}catch(Exception e) {
			return false;
		}
	}

        /**
         * This method retrieve all the CardConsumption in DataBase.
         * @return <code> CardConsumption[] : null </code> depending on DataBase match.
         */
	@Override
	public List<CardConsumption> findAll() {
		List<CardConsumption> cardConsumptions = (List<CardConsumption>) cardConsumptionRepository.findAll();
		if(cardConsumptions != null && cardConsumptions.size() > 0) {
			return cardConsumptions;
		}else {
			return null; 
		}
	}

        /**
         * This method finds a CardConsumption in BataBase based in the sent parameter
         * @param cardConsumptionId CardConsumption ID to find
         * @return <code> CardConsumption : null </code> depending on DataBase match
         */
	@Override
	public CardConsumption find(long cardConsumptionId) {
		return cardConsumptionRepository.findById(cardConsumptionId).orElse(null);
	}

        /**
         * This method retrieve all CardConsumptions associated to a BankCard ID
         * @param bankCardId BankCard ID associated to CardConsumptions
         * @return <code> BankCard[] : null </code> depending on DataBase match
         */
	@Override
	public List<CardConsumption> findByBankCardId(long bankCardId) {
		List<CardConsumption> cardConsumptions = (List<CardConsumption>) cardConsumptionRepository.findByBankCardId(bankCardId);
		if(cardConsumptions != null & cardConsumptions.size() > 0) {
			return cardConsumptions;
		}else {
			return null;
		}
	}
	
	
}
