package me.chatserver.database;

import me.chatserver.database.templates.FindRelationForUserID;
import me.chatserver.database.templates.FindRelationByUsers;
import me.chatserver.entities.Relation;
import me.chatserver.services.SQLTemplateService;
import me.chatserver.utils.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import java.util.ArrayList;
import java.util.List;

public class RelationsRepository {

    private final SQLTemplateService sqlTemplateService = SQLTemplateService.getSqlTemplateService();

    public void save(Relation relation) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = null;
        try {
            transaction = session.beginTransaction();
            session.save(relation);
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        } finally {
            session.close();
        }
    }

    public List<Relation> getByUsers(String user1ID, String user2ID) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            String sql = sqlTemplateService.getSQL(FindRelationByUsers.class);
            Query<Relation> query = session.createQuery(sql, Relation.class);
            query.setParameter("user1", user1ID);
            query.setParameter("user2", user2ID);
            return query.list();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
    }

    public List<Relation> getByUser(String id) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            String sql = sqlTemplateService.getSQL(FindRelationForUserID.class);
            Query<Relation> query = session.createQuery(sql, Relation.class);
            query.setParameter("id", id);
            return query.list();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
    }
}
