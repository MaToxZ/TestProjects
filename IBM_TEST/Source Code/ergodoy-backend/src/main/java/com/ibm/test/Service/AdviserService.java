package com.ibm.test.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.test.Interface.AdviserServiceLocal;
import com.ibm.test.Model.Adviser;
import com.ibm.test.Repository.AdviserRepository;

@Service
public class AdviserService implements AdviserServiceLocal {
	
	@Autowired
	AdviserRepository adviserRepository;

        /**
         * This method is used to create or update an Adviser in DataBase, if the Adviser object contains and aIdPk attribute
         * the incoming object will be updated otherwise will be created
         * @param adviser Adviser Object (POJO)
         * @return <code> true : false </code> depending if the transaction was successfully or failed.
         */
	@Override
	public boolean createAndUpdate(Adviser adviser) {
		if(adviserRepository.save(adviser) != null) {
			return true;
		}else {
			return false;
		}
	}
        

        /**
         * This method is use to delete an Adviser in DataBase.
         * @param adviserId Adviser id to be deleted.
         * @return <code> true : false </code> depending if the transaction was successfully or failed.
         */
	@Override
	public boolean delete(long adviserId) {
		try {
			adviserRepository.deleteById(adviserId);
			return true;
		}catch (Exception e) {
			return false;
		}
	}

        /**
         * This method retrieve all the Adviser in DataBase.
         * @return <code> Adviser[] : null </code> depending on DataBase match. 
         */
	@Override
	public List<Adviser> findAll() {
		return (List<Adviser>) adviserRepository.findAll();
	}

        /**
         * This method finds an Adviser in BataBase based in the sent parameter
         * @param adviserId Adviser ID to find
         * @return <code> Adviser : null </code> depending on DataBase match
         */
	@Override
	public Adviser find(long adviserId) {
		return adviserRepository.findById(adviserId).orElse(null);
	}
	
}
